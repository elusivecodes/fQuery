const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Manipulation', function() {

    describe('#clone', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div class="parent1">' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '</div>' +
                    '<div class="parent2">' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '</div>';
            });
        });

        it('clones all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const clones = dom.clone(
                        'div'
                    );
                    for (const clone of clones) {
                        document.body.appendChild(clone);
                    }
                    return document.body.innerHTML;
                }),
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('returns an array', async function() {
            assert.equal(
                await exec(_ => {
                    return Core.isArray(
                        dom.clone(
                            'div'
                        )
                    );
                }),
                true
            );
        });

        it('shallow clones all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const clones = dom.clone(
                        'div',
                        false
                    );
                    for (const clone of clones) {
                        document.body.appendChild(clone);
                    }
                    return document.body.innerHTML;
                }),
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div class="parent1"></div>' +
                '<div class="parent2"></div>'
            );
        });

        it('clones all nodes with events', async function() {
            assert.equal(
                await exec(_ => {
                    let result = 0;
                    dom.addEvent(
                        'a',
                        'click',
                        _ => { result++; }
                    );
                    const clones = dom.clone(
                        'a',
                        true,
                        true
                    );
                    for (const clone of clones) {
                        document.body.appendChild(clone);
                    }
                    dom.triggerEvent(
                        'body > a',
                        'click'
                    );
                    return result;
                }),
                4
            );
        });

        it('clones all nodes with data', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        '.test1',
                        'test1',
                        'Test 1'
                    );
                    dom.setData(
                        '.test2',
                        'test2',
                        'Test 2'
                    );
                    const clones = dom.clone(
                        'a',
                        true,
                        false,
                        true
                    );
                    for (const clone of clones) {
                        document.body.appendChild(clone);
                    }
                    return [
                        dom.getData('body > .test1', 'test1'),
                        dom.getData('body > .test2', 'test2')
                    ];
                }),
                [
                    'Test 1',
                    'Test 2'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    const clones = dom.clone(
                        document.querySelector('.parent1')
                    );
                    for (const clone of clones) {
                        document.body.appendChild(clone);
                    }
                    return document.body.innerHTML;
                }),
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    const clones = dom.clone(
                        document.body.children,
                        false
                    );
                    for (const clone of clones) {
                        document.body.appendChild(clone);
                    }
                    return document.body.innerHTML;
                }),
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div class="parent1"></div>' +
                '<div class="parent2"></div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    const clones = dom.clone(
                        document.querySelectorAll('div')
                    );
                    for (const clone of clones) {
                        document.body.appendChild(clone);
                    }
                    return document.body.innerHTML;
                }),
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    const clones = dom.clone(
                        [
                            document.querySelector('.parent1'),
                            document.querySelector('.parent2')
                        ]
                    );
                    for (const clone of clones) {
                        document.body.appendChild(clone);
                    }
                    return document.body.innerHTML;
                }),
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

    });

    describe('#detach', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<a href="#" id="test3">Test</a>' +
                    '<a href="#" id="test4">Test</a>' +
                    '</div>';
            });
        });

        it('detaches all nodes from the DOM', async function() {
            assert.equal(
                await exec(_ => {
                    dom.detach(
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1"></div>' +
                '<div id="parent2"></div>'
            );
        });

        it('returns an array', async function() {
            assert.equal(
                await exec(_ => {
                    return Core.isArray(
                        dom.detach(
                            'a'
                        )
                    );
                }),
                true
            );
        });

        it('returns detached nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.detach(
                        'a'
                    ).map(node => node.id);
                }),
                [
                    'test1',
                    'test2',
                    'test3',
                    'test4'
                ]
            );
        });

        it('does not remove events', async function() {
            assert.equal(
                await exec(_ => {
                    let result = 0;
                    dom.addEvent(
                        'a',
                        'click',
                        _ => { result++; }
                    );
                    const nodes = dom.detach(
                        'a'
                    );
                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }
                    dom.triggerEvent(
                        'a',
                        'click'
                    );
                    return result;
                }),
                4
            );
        });

        it('does not remove data', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        '#test1',
                        'test1',
                        'Test 1'
                    );
                    dom.setData(
                        '#test2',
                        'test2',
                        'Test 2'
                    );
                    const nodes = dom.detach(
                        'a'
                    );
                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }
                    return [
                        dom.getData('#test1', 'test1'),
                        dom.getData('#test2', 'test2')
                    ];
                }),
                [
                    'Test 1',
                    'Test 2'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.detach(
                        document.getElementById('test1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.detach(
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                ''
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.detach(
                        document.querySelectorAll('a')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1"></div>' +
                '<div id="parent2"></div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.detach(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2'),
                            document.getElementById('test3'),
                            document.getElementById('test4')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1"></div>' +
                '<div id="parent2"></div>'
            );
        });

        it('returns an empty array for empty nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.detach(
                        '#invalid'
                    );
                }),
                []
            );
        });

    });

    describe('#empty', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="outer1">' +
                    '<div id="inner1">' +
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>' +
                    '</div>' +
                    '</div>' +
                    '<div id="outer2">' +
                    '<div id="inner2">' +
                    '<a href="#" id="test3">Test</a>' +
                    '<a href="#" id="test4">Test</a>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('removes contents of all nodes from the DOM', async function() {
            assert.equal(
                await exec(_ => {
                    dom.empty(
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1"></div>' +
                '<div id="outer2"></div>'
            );
        });

        it('removes all events recursively', async function() {
            assert.equal(
                await exec(_ => {
                    const nodes = [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ];
                    let result = 0;
                    dom.addEvent(
                        'a',
                        'click',
                        _ => { result++; }
                    );
                    dom.empty(
                        'div'
                    );
                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }
                    dom.triggerEvent(
                        'a',
                        'click'
                    );
                    return result;
                }),
                0
            );
        });

        it('removes all data recursively', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const nodes = [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ];
                    dom.setData(
                        '#test1',
                        'test1',
                        'Test 1'
                    );
                    dom.setData(
                        '#test2',
                        'test2',
                        'Test 2'
                    );
                    dom.empty(
                        'div'
                    );
                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }
                    return [
                        dom.getData('#test1', 'test1'),
                        dom.getData('#test2', 'test2')
                    ]
                }),
                [
                    null,
                    null
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.empty(
                        document.getElementById('outer1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1"></div>' +
                '<div id="outer2">' +
                '<div id="inner2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.empty(
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1"></div>' +
                '<div id="outer2"></div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.empty(
                        document.querySelectorAll('div')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1"></div>' +
                '<div id="outer2"></div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.empty(
                        [
                            document.getElementById('outer1'),
                            document.getElementById('outer2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1"></div>' +
                '<div id="outer2"></div>'
            );
        });

    });

    describe('#remove', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="outer1">' +
                    '<div id="inner1">' +
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>' +
                    '</div>' +
                    '</div>' +
                    '<div id="outer2">' +
                    '<div id="inner2">' +
                    '<a href="#" id="test3">Test</a>' +
                    '<a href="#" id="test4">Test</a>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('removes all nodes from the DOM', async function() {
            assert.equal(
                await exec(_ => {
                    dom.remove(
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1">' +
                '<div id="inner1">' +
                '</div>' +
                '</div>' +
                '<div id="outer2">' +
                '<div id="inner2">' +
                '</div>' +
                '</div>'
            );
        });

        it('removes all events', async function() {
            assert.equal(
                await exec(_ => {
                    const nodes = [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ];
                    let result = 0;
                    dom.addEvent(
                        'a',
                        'click',
                        _ => { result++; }
                    );
                    dom.remove(
                        'a'
                    );
                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }
                    dom.triggerEvent(
                        'a',
                        'click'
                    );
                    return result;
                }),
                0
            );
        });

        it('removes all events recursively', async function() {
            assert.equal(
                await exec(_ => {
                    const nodes = [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ];
                    let result = 0;
                    dom.addEvent(
                        'a',
                        'click',
                        _ => { result++; }
                    );
                    dom.remove(
                        'div'
                    );
                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }
                    dom.triggerEvent(
                        'a',
                        'click'
                    );
                    return result;
                }),
                0
            );
        });

        it('removes all data', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const nodes = [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ];
                    dom.setData(
                        '#test1',
                        'test1',
                        'Test 1'
                    );
                    dom.setData(
                        '#test2',
                        'test2',
                        'Test 2'
                    );
                    dom.remove(
                        'a'
                    );
                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }
                    return [
                        dom.getData('#test1', 'test1'),
                        dom.getData('#test2', 'test2')
                    ]
                }),
                [
                    null,
                    null
                ]
            );
        });

        it('removes all data recursively', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const nodes = [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ];
                    dom.setData(
                        '#test1',
                        'test1',
                        'Test 1'
                    );
                    dom.setData(
                        '#test2',
                        'test2',
                        'Test 2'
                    );
                    dom.remove(
                        'div'
                    );
                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }
                    return [
                        dom.getData('#test1', 'test1'),
                        dom.getData('#test2', 'test2')
                    ]
                }),
                [
                    null,
                    null
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.remove(
                        document.getElementById('inner1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1">' +
                '</div>' +
                '<div id="outer2">' +
                '<div id="inner2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.remove(
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                ''
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.remove(
                        document.querySelectorAll('a')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1">' +
                '<div id="inner1">' +
                '</div>' +
                '</div>' +
                '<div id="outer2">' +
                '<div id="inner2">' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.remove(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2'),
                            document.getElementById('test3'),
                            document.getElementById('test4')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="outer1">' +
                '<div id="inner1">' +
                '</div>' +
                '</div>' +
                '<div id="outer2">' +
                '<div id="inner2">' +
                '</div>' +
                '</div>'
            );
        });

    });

    describe('#replaceAll', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div class="outer1">' +
                    '<div class="inner1">' +
                    '<a href="#">Test</a>' +
                    '<a href="#">Test</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="outer2">' +
                    '<div class="inner2">' +
                    '<a href="#">Test</a>' +
                    '<a href="#">Test</a>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('replaces each other node with nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceAll(
                        'a',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceAll(
                        document.querySelector('.inner1'),
                        document.querySelector('.inner2')
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceAll(
                        document.querySelector('.outer1').children,
                        document.querySelector('.outer2').children
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceAll(
                        document.querySelectorAll('.outer1 > div'),
                        document.querySelectorAll('.outer2 > div'),
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceAll(
                        [
                            document.querySelector('.inner1')
                        ],
                        [
                            document.querySelector('.inner2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceAll(
                        '<div><span class="test">Test</span></div>',
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<div><span class="test">Test</span></div>' +
                '<div><span class="test">Test</span></div>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner2">' +
                '<div><span class="test">Test</span></div>' +
                '<div><span class="test">Test</span></div>' +
                '</div>' +
                '</div>'
            );
        });

    });

    describe('#replaceWith', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div class="outer1">' +
                    '<div class="inner1">' +
                    '<a href="#">Test</a>' +
                    '<a href="#">Test</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="outer2">' +
                    '<div class="inner2">' +
                    '<a href="#">Test</a>' +
                    '<a href="#">Test</a>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('replaces each node with other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceWith(
                        'div',
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceWith(
                        document.querySelector('.inner2'),
                        document.querySelector('.inner1')
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceWith(
                        document.querySelector('.outer2').children,
                        document.querySelector('.outer1').children
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceWith(
                        document.querySelectorAll('.outer2 > div'),
                        document.querySelectorAll('.outer1 > div'),
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceWith(
                        [
                            document.querySelector('.inner2')
                        ],
                        [
                            document.querySelector('.inner1')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.replaceWith(
                        'a',
                        '<div><span class="test">Test</span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<div><span class="test">Test</span></div>' +
                '<div><span class="test">Test</span></div>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner2">' +
                '<div><span class="test">Test</span></div>' +
                '<div><span class="test">Test</span></div>' +
                '</div>' +
                '</div>'
            );
        });

    });

});