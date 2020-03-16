const assert = require('assert').strict;
const exec = require('../../setup');

describe('DOM Attributes (Position)', function() {

    describe('#center', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                    '<div id="test2"></div>';
                window.scrollTo(1000, 1000);
            });
        });

        it('returns the center position of the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.center(
                        'div'
                    );
                }),
                {
                    x: 700,
                    y: 150
                }
            )
        });

        it('returns the center position of the first node with offset', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.center(
                        'div',
                        true
                    );
                }),
                {
                    x: 1158,
                    y: 1150
                }
            )
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.center(
                        document.getElementById('test1')
                    );
                }),
                {
                    x: 700,
                    y: 150
                }
            )
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.center(
                        document.body.children
                    );
                }),
                {
                    x: 700,
                    y: 150
                }
            )
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.center(
                        document.querySelectorAll('div')
                    );
                }),
                {
                    x: 700,
                    y: 150
                }
            )
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.center(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                }),
                {
                    x: 700,
                    y: 150
                }
            )
        });

    });

    describe('#constrain', function() {

        it('constrains the first node inside another node');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#distTo', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                    '<div id="test2"></div>';
                window.scrollTo(1000, 1000);
            });
        });

        it('returns the distance to the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distTo(
                        'div',
                        580,
                        128
                    )
                }),
                122
            );
        });

        it('returns the distance to the first node with offset', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distTo(
                        'div',
                        1038,
                        1128,
                        true
                    )
                }),
                122
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distTo(
                        document.getElementById('test1'),
                        580,
                        128
                    )
                }),
                122
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distTo(
                        document.body.children,
                        580,
                        128
                    )
                }),
                122
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distTo(
                        document.querySelectorAll('div'),
                        580,
                        128
                    )
                }),
                122
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distTo(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        580,
                        128
                    )
                }),
                122
            );
        });

    });

    describe('#distToNode', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                    '<div id="test2" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>';
                window.scrollTo(1000, 2000);
            });
        });

        it('returns the distance from the first node to another node');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#nearestTo', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                    '<div id="test2" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>';
                window.scrollTo(1000, 2000);
            });
        });

        it('returns the nearest node to a position', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.nearestTo(
                        'div',
                        580,
                        128
                    ).id;
                }),
                'test2'
            );
        });

        it('returns the nearest node to a position with offset');

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.nearestTo(
                        document.getElementById('test1'),
                        500,
                        100
                    ).id;
                }),
                'test1'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.nearestTo(
                        document.body.children,
                        500,
                        100
                    ).id;
                }),
                'test2'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.nearestTo(
                        document.querySelectorAll('div'),
                        500,
                        100
                    ).id;
                }),
                'test2'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.nearestTo(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        500,
                        100
                    ).id;
                }),
                'test2'
            );
        });

    });

    describe('#nearestToNode', function() {

        it('returns the nearest node to another node');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#percentX', function() {

        it('returns the percent of a position along the X-axis for the first node');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#percentY', function() {

        it('returns the percent of a position along the Y-axis for the first node');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#position', function() {

        it('returns the position of the first node');
        it('returns the position of the first node with offset');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#rect', function() {

        it('returns the bounding rectangle of the first node');
        it('returns the bounding rectangle of the first node with offset');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

});