const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Scroll)', function() {

    describe('#getScrollX', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; overflow-x: scroll;"><div style="display: block; width: 1000px; height: 1px;"></div></div><div id="test2"></div>'
                );
                dom.setScrollX('#test1', 100);
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
                    dom.setHTML(
                        document.body,
                        '<div style="block; width: 1000px; height: 1000px;"></div>'
                    );
                    dom.setScrollX(window, 100);
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
                        dom.findOne('#test1')
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
                        dom.find('div')
                    );
                }),
                100
            );
        });

    });

    describe('#getScrollY', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; height: 100px; overflow-y: scroll;"><div style="display: block; width: 1px; height: 1000px;"></div></div><div id="test2"></div>'
                );
                dom.setScrollY('#test1', 100);
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
                    dom.setHTML(
                        document.body,
                        '<div style="block; width: 1000px; height: 1000px;"></div>'
                    );
                    dom.setScrollY(window, 100);
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
                        dom.findOne('#test1')
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
                        dom.find('div')
                    );
                }),
                100
            );
        });

    });

    describe('#setScroll', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; height: 100px; overflow: scroll;"><div style="display: block; width: 1000px; height: 1000px;"></div></div><div id="test2" style="display: block; width: 100px; height: 100px; overflow: scroll;"><div style="display: block; width: 1000px; height: 1000px;"></div></div>'
                );
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
                            dom.getScrollX('#test1'),
                            dom.getScrollY('#test1')
                        ],
                        [
                            dom.getScrollX('#test2'),
                            dom.getScrollY('#test2')
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
                        dom.findOne('#test1'),
                        100,
                        100
                    );
                    return [
                        dom.getScrollX('#test1'),
                        dom.getScrollY('#test1')
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
                            dom.getScrollX('#test1'),
                            dom.getScrollY('#test1')
                        ],
                        [
                            dom.getScrollX('#test2'),
                            dom.getScrollY('#test2')
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
                            dom.getScrollX('#test1'),
                            dom.getScrollY('#test1')
                        ],
                        [
                            dom.getScrollX('#test2'),
                            dom.getScrollY('#test2')
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
                        dom.find('div'),
                        100,
                        100
                    );
                    return [
                        [
                            dom.getScrollX('#test1'),
                            dom.getScrollY('#test1')
                        ],
                        [
                            dom.getScrollX('#test2'),
                            dom.getScrollY('#test2')
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
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; height: 1px; overflow: scroll;"><div style="display: block; width: 1000px; height: 1px;"></div></div><div id="test2" style="display: block; width: 100px; height: 1px; overflow: scroll;"><div style="display: block; width: 1000px; height: 1px;"></div></div>'
                );
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
                        dom.getScrollX('#test1'),
                        dom.getScrollX('#test2')
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
                        dom.findOne('#test1'),
                        100,
                    );
                    return dom.getScrollX('#test1');
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
                        dom.getScrollX('#test1'),
                        dom.getScrollX('#test2')
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
                        dom.getScrollX('#test1'),
                        dom.getScrollX('#test2')
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
                        dom.find('div'),
                        100
                    );
                    return [
                        dom.getScrollX('#test1'),
                        dom.getScrollX('#test2')
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
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 1px; height: 100px; overflow: scroll;"><div style="display: block; width: 1px; height: 1000px;"></div></div><div id="test2" style="display: block; width: 1px; height: 100px; overflow: scroll;"><div style="display: block; width: 1px; height: 1000px;"></div></div>'
                );
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
                        dom.getScrollY('#test1'),
                        dom.getScrollY('#test2')
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
                        dom.findOne('#test1'),
                        100,
                    );
                    return dom.getScrollY('#test1');
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
                        dom.getScrollY('#test1'),
                        dom.getScrollY('#test2')
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
                        dom.getScrollY('#test1'),
                        dom.getScrollY('#test2')
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
                        dom.find('div'),
                        100
                    );
                    return [
                        dom.getScrollY('#test1'),
                        dom.getScrollY('#test2')
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