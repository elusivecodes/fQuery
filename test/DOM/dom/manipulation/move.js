const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Move', function() {

    describe('#after', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span></span>' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span></span>' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '</div>';
            });
        });

        it('inserts each other node after each node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        'div',
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('clones all copies except last', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.querySelector('#parent1 > .test1');
                    dom.after(
                        'div',
                        'a'
                    );
                    const clone = document.querySelector('#parent2 ~ .test1');
                    return element.isSameNode(clone);
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        document.getElementById('parent1'),
                        document.querySelector('.test1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        document.body.children,
                        document.getElementById('parent1').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '</div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        document.querySelectorAll('div'),
                        document.querySelectorAll('a')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        'div',
                        '<div><span></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div><span></span></div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div><span></span></div>'
            );
        });

    });

    describe('#append', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '<span></span>' +
                    '</div>';
            });
        });

        it('appends each other node to each node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        'div',
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('clones all copies except last', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.querySelector('#parent1 > .test1');
                    dom.append(
                        'div',
                        'a'
                    );
                    const clone = document.querySelector('#parent2 > .test1');
                    return element.isSameNode(clone);
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        document.getElementById('parent1'),
                        document.querySelector('.test1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        document.body.children,
                        document.getElementById('parent1').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        document.querySelectorAll('div'),
                        document.querySelectorAll('a')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        'div',
                        '<div><span></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '<div><span></span></div>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '<div><span></span></div>' +
                '</div>'
            );
        });

    });

    describe('#appendTo', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '<span></span>' +
                    '</div>';
            });
        });

        it('appends each node to each other node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        'a',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('clones all copies except last', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.querySelector('#parent1 > .test1');
                    dom.appendTo(
                        'a',
                        'div'
                    );
                    const clone = document.querySelector('#parent2 > .test1');
                    return element.isSameNode(clone);
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        document.querySelector('.test1'),
                        document.getElementById('parent1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        document.getElementById('parent1').children,
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        document.querySelectorAll('a'),
                        document.querySelectorAll('div')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ],
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        '<div><span></span></div>',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '<div><span></span></div>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '<div><span></span></div>' +
                '</div>'
            );
        });

    });

    describe('#before', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span></span>' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span></span>' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '</div>';
            });
        });

        it('inserts each other node before each node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        'div',
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>'
            );
        });

        it('clones all copies except last', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.querySelector('#parent1 > .test1');
                    dom.before(
                        'div',
                        'a'
                    );
                    const clone = document.querySelector('#parent1 ~ .test1');
                    return element.isSameNode(clone);
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        document.getElementById('parent1'),
                        document.querySelector('.test1')
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        document.body.children,
                        document.getElementById('parent1').children
                    );
                    return document.body.innerHTML;
                }),
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<div id="parent1">' +
                '</div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        document.querySelectorAll('div'),
                        document.querySelectorAll('a')
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        'div',
                        '<div><span></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div><span></span></div>' +
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div><span></span></div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

    });

    describe('#insertAfter', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span></span>' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span></span>' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '</div>';
            });
        });

        it('inserts each node after each other node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        'a',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('clones all copies except last', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.querySelector('#parent1 > .test1');
                    dom.insertAfter(
                        'a',
                        'div'
                    );
                    const clone = document.querySelector('#parent2 ~ .test1');
                    return element.isSameNode(clone);
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        document.querySelector('.test1'),
                        document.getElementById('parent1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        document.getElementById('parent1').children,
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '</div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        document.querySelectorAll('a'),
                        document.querySelectorAll('div')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ],
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        '<div><span></span></div>',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div><span></span></div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>' +
                '<div><span></span></div>'
            );
        });

    });

    describe('#insertBefore', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span></span>' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span></span>' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '</div>';
            });
        });

        it('inserts each node before each other node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        'a',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>'
            );
        });

        it('clones all copies except last', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.querySelector('#parent1 > .test1');
                    dom.insertBefore(
                        'a',
                        'div'
                    );
                    const clone = document.querySelector('#parent1 ~ .test1');
                    return element.isSameNode(clone);
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        document.querySelector('.test1'),
                        document.getElementById('parent1')
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        document.getElementById('parent1').children,
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<div id="parent1">' +
                '</div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        document.querySelectorAll('a'),
                        document.querySelectorAll('div')
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ],
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        '<div><span></span></div>',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div><span></span></div>' +
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div><span></span></div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

    });

    describe('#prepend', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span></span>' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span></span>' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '</div>';
            });
        });

        it('prepends each other node to each node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        'div',
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('clones all copies except last', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.querySelector('#parent1 > .test1');
                    dom.prepend(
                        'div',
                        'a'
                    );
                    const clone = document.querySelector('#parent2 > .test1');
                    return element.isSameNode(clone);
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        document.getElementById('parent1'),
                        document.querySelector('.test1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        document.body.children,
                        document.getElementById('parent1').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        document.querySelectorAll('div'),
                        document.querySelectorAll('a')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        'div',
                        '<div><span></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<div><span></span></div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<div><span></span></div>' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

    });

    describe('#prependTo', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<span></span>' +
                    '<a href="#" class="test1">Test</a>' +
                    '<a href="#" class="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<span></span>' +
                    '<a href="#" class="test3">Test</a>' +
                    '<a href="#" class="test4">Test</a>' +
                    '</div>';
            });
        });

        it('prepends each node to each other node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        'a',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('clones all copies except last', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.querySelector('#parent1 > .test1');
                    dom.prependTo(
                        'a',
                        'div'
                    );
                    const clone = document.querySelector('#parent2 > .test1');
                    return element.isSameNode(clone);
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        document.querySelector('.test1'),
                        document.getElementById('parent1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        document.getElementById('parent1').children,
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        document.querySelectorAll('a'),
                        document.querySelectorAll('div')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ],
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        '<div><span></span></div>',
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<div><span></span></div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<div><span></span></div>' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

    });

});