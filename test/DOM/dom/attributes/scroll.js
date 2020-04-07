const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Scroll)', function() {

    describe('#getScrollX', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" style="display: block; width: 100px; overflow-x: scroll;">' +
                    '<div style="display: block; width: 1000px; height: 1px;"></div>' +
                    '</div>' +
                    '<div id="test2"></div>';
                document.getElementById('test1').scrollLeft = 100;
            });
        });

        it('returns the scroll X position of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollX(
                        'div'
                    );
                }),
                100
            );
        });

        it('works with Window', async function() {
            assert.equal(
                await exec(_ => {
                    document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                    window.scrollTo(100, 0);
                    return dom.getScrollX(
                        window
                    );
                }),
                100
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollX(
                        document.getElementById('test1')
                    );
                }),
                100
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollX(
                        document.body.children
                    );
                }),
                100
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollX(
                        document.querySelectorAll('div')
                    );
                }),
                100
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollX(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                }),
                100
            );
        });

    });

    describe('#getScrollY', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" style="display: block; height: 100px; overflow-y: scroll;">' +
                    '<div style="display: block; width: 1px; height: 1000px;"></div>' +
                    '</div>' +
                    '<div id="test2"></div>';
                document.getElementById('test1').scrollTop = 100;
            });
        });

        it('returns the scroll Y position of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollY(
                        'div'
                    );
                }),
                100
            );
        });

        it('works with Window', async function() {
            assert.equal(
                await exec(_ => {
                    document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                    window.scrollTo(0, 100);
                    return dom.getScrollY(
                        window
                    );
                }),
                100
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollY(
                        document.getElementById('test1')
                    );
                }),
                100
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollY(
                        document.body.children
                    );
                }),
                100
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollY(
                        document.querySelectorAll('div')
                    );
                }),
                100
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getScrollY(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                }),
                100
            );
        });

    });

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
                    dom.setScroll(
                        'div',
                        100,
                        100
                    );
                    return [
                        [
                            document.getElementById('test1').scrollLeft,
                            document.getElementById('test1').scrollTop
                        ],
                        [
                            document.getElementById('test2').scrollLeft,
                            document.getElementById('test2').scrollTop
                        ]
                    ];
                }),
                [
                    [100, 100],
                    [100, 100]
                ]
            );
        });

        it('works with Window');

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setScroll(
                        document.getElementById('test1'),
                        100,
                        100
                    );
                    return [
                        document.getElementById('test1').scrollLeft,
                        document.getElementById('test1').scrollTop
                    ];
                }),
                [100, 100]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setScroll(
                        document.body.children,
                        100,
                        100
                    );
                    return [
                        [
                            document.getElementById('test1').scrollLeft,
                            document.getElementById('test1').scrollTop
                        ],
                        [
                            document.getElementById('test2').scrollLeft,
                            document.getElementById('test2').scrollTop
                        ]
                    ];
                }),
                [
                    [100, 100],
                    [100, 100]
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setScroll(
                        document.querySelectorAll('div'),
                        100,
                        100
                    );
                    return [
                        [
                            document.getElementById('test1').scrollLeft,
                            document.getElementById('test1').scrollTop
                        ],
                        [
                            document.getElementById('test2').scrollLeft,
                            document.getElementById('test2').scrollTop
                        ]
                    ];
                }),
                [
                    [100, 100],
                    [100, 100]
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setScroll(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        100,
                        100
                    );
                    return [
                        [
                            document.getElementById('test1').scrollLeft,
                            document.getElementById('test1').scrollTop
                        ],
                        [
                            document.getElementById('test2').scrollLeft,
                            document.getElementById('test2').scrollTop
                        ]
                    ];
                }),
                [
                    [100, 100],
                    [100, 100]
                ]
            );
        });

    });

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

        it('works with Window');

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setScrollX(
                        document.getElementById('test1'),
                        100,
                    );
                    return document.getElementById('test1').scrollLeft;
                }),
                100
            );
        });

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setScrollX(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
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

    });

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

        it('works with Window');

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setScrollY(
                        document.getElementById('test1'),
                        100,
                    );
                    return document.getElementById('test1').scrollTop;
                }),
                100
            );
        });

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setScrollY(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
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

    });

});