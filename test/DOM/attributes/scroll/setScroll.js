const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#setScroll', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; overflow: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1000px;"></div>' +
                '</div>' +
                '<div id="test2" style="display: block; width: 100px; height: 100px; overflow: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1000px;"></div>' +
                '</div>';
        });
    });

    it('sets the scroll position for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.setScroll(
                    'div',
                    100,
                    50
                );
                return [
                    [
                        element1.scrollLeft,
                        element1.scrollTop
                    ],
                    [
                        element2.scrollLeft,
                        element2.scrollTop
                    ]
                ];
            }),
            [
                [100, 50],
                [100, 50]
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element = document.getElementById('test1');
                dom.setScroll(
                    element,
                    100,
                    50
                );
                return [
                    element.scrollLeft,
                    element.scrollTop
                ];
            }),
            [100, 50]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.setScroll(
                    document.querySelectorAll('div'),
                    100,
                    50
                );
                return [
                    [
                        element1.scrollLeft,
                        element1.scrollTop
                    ],
                    [
                        element2.scrollLeft,
                        element2.scrollTop
                    ]
                ];
            }),
            [
                [100, 50],
                [100, 50]
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.setScroll(
                    document.body.children,
                    100,
                    50
                );
                return [
                    [
                        element1.scrollLeft,
                        element1.scrollTop
                    ],
                    [
                        element2.scrollLeft,
                        element2.scrollTop
                    ]
                ];
            }),
            [
                [100, 50],
                [100, 50]
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.setScroll(
                    document,
                    100,
                    50
                );
                return [
                    document.scrollingElement.scrollLeft,
                    document.scrollingElement.scrollTop
                ];
            }),
            [100, 50]
        );
    });

    it('works with Window nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.setScroll(
                    window,
                    100,
                    50
                );
                return [
                    window.scrollX,
                    window.scrollY
                ];
            }),
            [100, 50]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.setScroll(
                    [
                        element1,
                        element2
                    ],
                    100,
                    50
                );
                return [
                    [
                        element1.scrollLeft,
                        element1.scrollTop
                    ],
                    [
                        element2.scrollLeft,
                        element2.scrollTop
                    ]
                ];
            }),
            [
                [100, 50],
                [100, 50]
            ]
        );
    });

});