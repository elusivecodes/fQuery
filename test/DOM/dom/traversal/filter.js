const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Filter', function() {

    describe('#connected', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>';
            });
        });

        it('returns nodes connected to the DOM', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.connected(
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2'
                ]
            )
        });

        it('filters out nodes not connected to the DOM', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.connected(
                        document.createElement('div')
                    ).map(node => node.id);
                }),
                []
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.connected(
                        document.getElementById('div1')
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.connected(
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.connected(
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.connected(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2'
                ]
            )
        });

    });

    describe('#equal', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span data-id="span1"></span>' +
                    '<span data-id="span2"></span>' +
                    '<span data-id="span3"></span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span data-id="span2"></span>' +
                    '<span data-id="span3"></span>' +
                    '<span data-id="span4"></span>' +
                    '</div>';
            });
        });

        it('returns nodes equal to other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        '#parent1 span',
                        '#parent2 span'
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2',
                    'span3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        document.querySelector('#parent1 [data-id="span2"]'),
                        '#parent2 span'
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        document.getElementById('parent1').children,
                        '#parent2 span'
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2',
                    'span3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        document.querySelectorAll('#parent1 span'),
                        '#parent2 span'
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2',
                    'span3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        [
                            document.querySelector('#parent1 > [data-id="span1"]'),
                            document.querySelector('#parent1 > [data-id="span2"]'),
                            document.querySelector('#parent1 > [data-id="span3"]')
                        ],
                        '#parent2 span'
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2',
                    'span3'
                ]
            )
        });

        it('works with HTMLElement other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        '#parent1 span',
                        document.querySelector('#parent2 > [data-id="span2"]')
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2'
                ]
            )
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        '#parent1 span',
                        document.getElementById('parent2').children
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2',
                    'span3'
                ]
            )
        });

        it('works with NodeList other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        '#parent1 span',
                        document.querySelectorAll('#parent2 > span')
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2',
                    'span3'
                ]
            )
        });

        it('works with array other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.equal(
                        '#parent1 span',
                        [
                            document.querySelector('#parent2 > [data-id="span2"]'),
                            document.querySelector('#parent2 > [data-id="span3"]')
                        ]
                    ).map(node => node.dataset.id);
                }),
                [
                    'span2',
                    'span3'
                ]
            )
        });

    });

    describe('#filter', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2" data-filter="test"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4" data-filter="test"></div>';
            });
        });

        it('returns filtered nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        'div',
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        document.getElementById('div2'),
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        document.body.children,
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        document.querySelectorAll('div'),
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        'div',
                        node => node.dataset.filter === 'test'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with HTMLElement filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        'div',
                        document.getElementById('div2')
                    ).map(node => node.id);
                }),
                [
                    'div2'
                ]
            )
        });

        it('works with HTMLCollection filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        'div',
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2',
                    'div3',
                    'div4'
                ]
            )
        });

        it('works with NodeList filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        'div',
                        document.querySelectorAll('[data-filter="test"]')
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with array filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.filter(
                        'div',
                        [
                            document.getElementById('div2'),
                            document.getElementById('div4')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

    });

    describe('#filterOne', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2" data-filter="test"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4" data-filter="test"></div>';
            });
        });

        it('returns the first node matching a filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        'div',
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        document.getElementById('div2'),
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        document.body.children,
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        document.querySelectorAll('div'),
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with function filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        'div',
                        node => node.dataset.filter === 'test'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with HTMLElement filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        'div',
                        document.getElementById('div2')
                    ).id;
                }),
                'div2'
            )
        });

        it('works with HTMLCollection filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        'div',
                        document.body.children
                    ).id;
                }),
                'div1'
            )
        });

        it('works with NodeList filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        'div',
                        document.querySelectorAll('[data-filter="test"]')
                    ).id;
                }),
                'div2'
            )
        });

        it('works with array filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.filterOne(
                        'div',
                        [
                            document.getElementById('div2'),
                            document.getElementById('div4')
                        ]
                    ).id;
                }),
                'div2'
            )
        });

    });

    describe('#fixed', function() {

        it('returns fixed nodes');
        it('returns descendents of fixed nodes');
        it('works with HTMLElement nodes');
        it('works with HTMLCollection nodes');
        it('works with NodeList nodes');
        it('works with array nodes');

    });

    describe('#hidden', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { display: none; }' +
                    '</style>' +
                    '<div id="div1"></div>' +
                    '<div id="div2" class="test"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4" class="test"></div>';
            });
        });

        it('returns hidden nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.hidden(
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('returns descendents of hidden nodes');

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.hidden(
                        document.getElementById('div2')
                    ).map(node => node.id);
                }),
                [
                    'div2'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.hidden(
                        document.body.children
                    ).map(node => node.id).filter(id => id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.hidden(
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.hidden(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

    });

    describe('#not', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" data-filter="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" data-filter="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns nodes not matching a filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        'div',
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        document.getElementById('div2'),
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        document.body.children,
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        document.querySelectorAll('div'),
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        '[data-filter="test"]'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with function filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        'div',
                        node => node.dataset.filter === 'test'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with HTMLElement filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        'div',
                        document.getElementById('div1')
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div3',
                    'div4'
                ]
            )
        });

        it('works with HTMLCollection filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        'div',
                        document.body.children
                    ).map(node => node.id);
                }),
                []
            )
        });

        it('works with NodeList filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        'div',
                        document.querySelectorAll('[data-filter="test"]')
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with array filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.not(
                        'div',
                        [
                            document.getElementById('div1'),
                            document.getElementById('div3')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

    });

    describe('#notOne', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" data-filter="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" data-filter="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns the first node not matching a filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        'div',
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        document.getElementById('div2'),
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        document.body.children,
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        document.querySelectorAll('div'),
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        '[data-filter="test"]'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with function filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        'div',
                        node => node.dataset.filter === 'test'
                    ).id;
                }),
                'div2'
            )
        });

        it('works with HTMLElement filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        'div',
                        document.getElementById('div1')
                    ).id;
                }),
                'div2'
            )
        });

        it('works with HTMLCollection filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        'div',
                        document.body.children
                    );
                }),
                null
            )
        });

        it('works with NodeList filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        'div',
                        document.querySelectorAll('[data-filter="test"]')
                    ).id;
                }),
                'div2'
            )
        });

        it('works with array filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.notOne(
                        'div',
                        [
                            document.getElementById('div1'),
                            document.getElementById('div3')
                        ]
                    ).id;
                }),
                'div2'
            )
        });

    });

    describe('#same', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns nodes identical to other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        'div',
                        '#div2, #div4'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        document.getElementById('div2'),
                        '#div2, #div4'
                    ).map(node => node.id);
                }),
                [
                    'div2'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        document.body.children,
                        '#div2, #div4'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        document.querySelectorAll('div'),
                        '#div2, #div4'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        '#div2, #div4'
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with HTMLElement other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        'div',
                        document.getElementById('div2')
                    ).map(node => node.id);
                }),
                [
                    'div2'
                ]
            )
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        'div',
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2',
                    'div3',
                    'div4'
                ]
            )
        });

        it('works with NodeList other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        'div',
                        document.querySelectorAll('#div2, #div4')
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

        it('works with array other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.same(
                        'div',
                        [
                            document.querySelector('#div2'),
                            document.querySelector('#div4')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'div2',
                    'div4'
                ]
            )
        });

    });

    describe('#visible', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { display: none; }' +
                    '</style>' +
                    '<div id="div1"></div>' +
                    '<div id="div2" class="test"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4" class="test"></div>';
            });
        });

        it('returns visible nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.visible(
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.visible(
                        document.getElementById('div1')
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.visible(
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.visible(
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.visible(
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
            )
        });

    });

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
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAnimation(
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAnimation(
                        document.getElementById('div1')
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAnimation(
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAnimation(
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAnimation(
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
            )
        });

    });

    describe('#withAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" title="Test 1"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" title="Test 2"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns nodes with a specified attribute', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAttribute(
                        'div',
                        'title'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAttribute(
                        document.getElementById('div1'),
                        'title'
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAttribute(
                        document.body.children,
                        'title'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAttribute(
                        document.querySelectorAll('div'),
                        'title'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withAttribute(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        'title'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

    });

    describe('#withChildren', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1">' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3">' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns nodes with children', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withChildren(
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withChildren(
                        document.getElementById('div1')
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withChildren(
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withChildren(
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withChildren(
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
            )
        });

    });

    describe('#withClass', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns nodes with a specified class', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withClass(
                        'div',
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withClass(
                        document.getElementById('div1'),
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withClass(
                        document.body.children,
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withClass(
                        document.querySelectorAll('div'),
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withClass(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

    });

    describe('#withCSSAnimation', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { animation: spin 4s linear infinite; }' +
                    '@keyframes spin { 100% { transform: rotate(360deg); } }' +
                    '</style>' +
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns nodes with CSS animations', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withCSSAnimation(
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withCSSAnimation(
                        document.getElementById('div1')
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withCSSAnimation(
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withCSSAnimation(
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withCSSAnimation(
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
            )
        });

    });

    describe('#withCSSTransition', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { transition: opacity 1s; }' +
                    '</style>' +
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
            )
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
            )
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
            )
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
            )
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
            )
        });

    });

    describe('#withData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4"></div>';
                dom.setData(
                    '#div1',
                    'test1',
                    'Test 1'
                );
                dom.setData(
                    '#div3',
                    'test2',
                    'Test 2'
                );
            });
        });

        it('returns nodes with data', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withData(
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('returns nodes with data for a key', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withData(
                        'div',
                        'test1'
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withData(
                        document.getElementById('div1')
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withData(
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withData(
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withData(
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
            )
        });

    });

    describe('#withDescendent', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1">' +
                    '<span>' +
                    '<a></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3">' +
                    '<span>' +
                    '<a></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns nodes with a descendent matching a filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withDescendent(
                        'div',
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('returns nodes with a descendent matching a custom selector filter', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withDescendent(
                        'div',
                        '> span > a'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withDescendent(
                        document.getElementById('div1'),
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withDescendent(
                        document.body.children,
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withDescendent(
                        document.querySelectorAll('div'),
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withDescendent(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with function filter');
        it('works with HTMLElement filter');
        it('works with HTMLCollection filter');
        it('works with NodeList filter');
        it('works with array filter');

    });

    describe('#withProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4"></div>';
                document.getElementById('div1').test = 'Test 1';
                document.getElementById('div3').test = 'Test 2';
            });
        });

        it('returns nodes with a specified property', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withProperty(
                        'div',
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withProperty(
                        document.getElementById('div1'),
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1'
                ]
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withProperty(
                        document.body.children,
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withProperty(
                        document.querySelectorAll('div'),
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.withProperty(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div3'
                ]
            )
        });

    });

});