const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Position)', function() {

    describe('#center', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div id="test2"></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
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
            );
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
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.center(
                        dom.findOne('#test1')
                    );
                }),
                {
                    x: 700,
                    y: 150
                }
            );
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
            );
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
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.center(
                        dom.find('div')
                    );
                }),
                {
                    x: 700,
                    y: 150
                }
            );
        });

    });

    describe('#constrain', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="fromParent"><div id="test1" data-toggle="from" style="display: block; width: 600px; height: 600px;"></div><div id="test2" data-toggle="from" style="display: block; width: 600px; height: 600px;"></div></div><div id="toParent"><div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div><div data-togle="to"></div></div>'
                );
            });
        });

        it('constrains each node inside another node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.constrain(
                        '[data-toggle="from"]',
                        '[data-toggle="to"]'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="fromParent"><div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div><div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div></div><div id="toParent"><div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div><div data-togle="to"></div></div>'
            )
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.constrain(
                        dom.findOne('#test1'),
                        dom.findOne('#test3')
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="fromParent"><div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div><div id="test2" data-toggle="from" style="display: block; width: 600px; height: 600px;"></div></div><div id="toParent"><div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div><div data-togle="to"></div></div>'
            )
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.constrain(
                        dom.findOne('#fromParent').children,
                        dom.findOne('#toParent').children
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="fromParent"><div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div><div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div></div><div id="toParent"><div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div><div data-togle="to"></div></div>'
            )
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.constrain(
                        document.querySelectorAll('[data-toggle="from"]'),
                        document.querySelectorAll('[data-toggle="to"]')
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="fromParent"><div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div><div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div></div><div id="toParent"><div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div><div data-togle="to"></div></div>'
            )
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.constrain(
                        dom.find('[data-toggle="from"]'),
                        dom.find('[data-toggle="to"]')
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="fromParent"><div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div><div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div></div><div id="toParent"><div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div><div data-togle="to"></div></div>'
            )
        });

    });

    describe('#distTo', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div id="test2"></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
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
                        1180,
                        1270,
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
                        dom.findOne('#test1'),
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
                        dom.find('div'),
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
                dom.setHTML(
                    document.body,
                    '<div id="fromParent"><div id="test1" data-toggle="from" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div data-toggle="from"></div></div><div id="toParent"><div id="test2" data-toggle="to" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div data-toggle="to"></div></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
            });
        });

        it('returns the distance from the first node to another node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distToNode(
                        '[data-toggle="from"]',
                        '[data-toggle="to"]'
                    );
                }),
                1250
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distToNode(
                        dom.findOne('#test1'),
                        dom.findOne('#test2')
                    );
                }),
                1250
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distToNode(
                        dom.findOne('#fromParent').children,
                        dom.findOne('#toParent').children
                    );
                }),
                1250
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distToNode(
                        document.querySelectorAll('[data-toggle="from"]'),
                        document.querySelectorAll('[data-toggle="to"]')
                    );
                }),
                1250
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.distToNode(
                        dom.find('[data-toggle="from"]'),
                        dom.find('[data-toggle="to"]')
                    );
                }),
                1250
            );
        });

    });

    describe('#nearestTo', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div id="test2" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
            });
        });

        it('returns the nearest node to a position', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestTo(
                        'div',
                        1000,
                        1000
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test2'
            );
        });

        it('returns the nearest node to a position with offset', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestTo(
                        'div',
                        1000,
                        1000,
                        true
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test1'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestTo(
                        dom.findOne('#test1'),
                        1000,
                        1000
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test1'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestTo(
                        document.body.children,
                        1000,
                        1000
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test2'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestTo(
                        document.querySelectorAll('div'),
                        1000,
                        1000
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test2'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestTo(
                        dom.find('div'),
                        1000,
                        1000
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test2'
            );
        });

    });

    describe('#nearestToNode', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="fromParent"><div id="test1" data-toggle="from" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div id="test2" data-toggle="from" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div></div><div id="toParent"><div id="test3" data-toggle="to"></div><div id="test4" data-toggle="to"></div></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
            });
        });

        it('returns the nearest node to another node', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestToNode(
                        '[data-toggle="from"]',
                        '[data-toggle="to"]'
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test2'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestToNode(
                        dom.findOne('#test1'),
                        dom.findOne('#test3')
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test1'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestToNode(
                        dom.findOne('#fromParent').children,
                        dom.findOne('#toParent').children
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test2'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestToNode(
                        document.querySelectorAll('[data-toggle="from"]'),
                        document.querySelectorAll('[data-toggle="to"]')
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test2'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    const nearest = dom.nearestToNode(
                        dom.find('[data-toggle="from"]'),
                        dom.find('[data-toggle="to"]')
                    );
                    return dom.getAttribute(nearest, 'id');
                }),
                'test2'
            );
        });

    });

    describe('#percentX', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div id="test2"></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
            });
        });

        it('returns the percent of a position along the X-axis for the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentX(
                        'div',
                        700
                    );
                }),
                50
            );
        });

        it('returns the percent of a position along the X-axis for the first node with offset', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentX(
                        'div',
                        1158,
                        true
                    );
                }),
                50
            );
        });

        it('clamps the returned value between 0 and 100', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return [
                        dom.percentX(
                            'div',
                            0
                        ),
                        dom.percentX(
                            'div',
                            2000
                        )
                    ];
                }),
                [
                    0,
                    100
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentX(
                        dom.findOne('#test1'),
                        700
                    );
                }),
                50
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentX(
                        document.body.children,
                        700
                    );
                }),
                50
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentX(
                        document.querySelectorAll('div'),
                        700
                    );
                }),
                50
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentX(
                        dom.find('div'),
                        700
                    );
                }),
                50
            );
        });

    });

    describe('#percentY', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div id="test2"></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
            });
        });

        it('returns the percent of a position along the Y-axis for the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentY(
                        'div',
                        150
                    );
                }),
                50
            );
        });

        it('returns the percent of a position along the Y-axis for the first node with offset', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentY(
                        'div',
                        1150,
                        true
                    );
                }),
                50
            );
        });

        it('clamps the returned value between 0 and 100', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return [
                        dom.percentY(
                            'div',
                            0
                        ),
                        dom.percentY(
                            'div',
                            2000
                        )
                    ];
                }),
                [
                    0,
                    100
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentY(
                        dom.findOne('#test1'),
                        150
                    );
                }),
                50
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentY(
                        document.body.children,
                        150
                    );
                }),
                50
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentY(
                        document.querySelectorAll('div'),
                        150
                    );
                }),
                50
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.percentY(
                        dom.find('div'),
                        150
                    );
                }),
                50
            );
        });

    });

    describe('#position', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="parent" style="position: relative; margin: 1050px; padding: 25px 50px;"><div id="test1" data-toggle="child" style="display: block; width: 100px; height: 100px; padding: 50px;"></div><div id="test2" data-toggle="child"></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
            });
        });

        it('returns the position of the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.position(
                        '[data-toggle="child"]'
                    );
                }),
                {
                    x: 50,
                    y: 25
                }
            );
        });

        it('returns the position of the first node with offset', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.position(
                        '[data-toggle="child"]',
                        true
                    );
                }),
                {
                    x: 1108,
                    y: 1075
                }
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.position(
                        dom.findOne('#test1')
                    );
                }),
                {
                    x: 50,
                    y: 25
                }
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.position(
                        dom.findOne('#parent').children
                    );
                }),
                {
                    x: 50,
                    y: 25
                }
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.position(
                        document.querySelectorAll('[data-toggle="child"]')
                    );
                }),
                {
                    x: 50,
                    y: 25
                }
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.position(
                        dom.find('[data-toggle="child"]')
                    );
                }),
                {
                    x: 50,
                    y: 25
                }
            );
        });

    });

    describe('#rect', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div><div id="test2"></div>'
                );
                dom.setScroll(
                    window,
                    1000,
                    1000
                );
            });
        });

        it('returns the bounding rectangle of the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.rect(
                        'div'
                    ).toJSON();
                }),
                {
                    x: 600,
                    y: 50,
                    width: 200,
                    height: 200,
                    top: 50,
                    right: 800,
                    bottom: 250,
                    left: 600
                }
            );
        });

        it('returns the bounding rectangle of the first node with offset', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.rect(
                        'div',
                        true
                    ).toJSON();
                }),
                {
                    x: 1058,
                    y: 1050,
                    width: 200,
                    height: 200,
                    top: 1050,
                    right: 1258,
                    bottom: 1250,
                    left: 1058
                }
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.rect(
                        dom.findOne('#test1')
                    ).toJSON();
                }),
                {
                    x: 600,
                    y: 50,
                    width: 200,
                    height: 200,
                    top: 50,
                    right: 800,
                    bottom: 250,
                    left: 600
                }
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.rect(
                        document.body.children
                    ).toJSON();
                }),
                {
                    x: 600,
                    y: 50,
                    width: 200,
                    height: 200,
                    top: 50,
                    right: 800,
                    bottom: 250,
                    left: 600
                }
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.rect(
                        document.querySelectorAll('div')
                    ).toJSON();
                }),
                {
                    x: 600,
                    y: 50,
                    width: 200,
                    height: 200,
                    top: 50,
                    right: 800,
                    bottom: 250,
                    left: 600
                }
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.rect(
                        dom.find('div')
                    ).toJSON();
                }),
                {
                    x: 600,
                    y: 50,
                    width: 200,
                    height: 200,
                    top: 50,
                    right: 800,
                    bottom: 250,
                    left: 600
                }
            );
        });

    });

});