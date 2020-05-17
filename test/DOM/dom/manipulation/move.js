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
                    const element1 = document.querySelector('#parent1 > .test1');
                    dom.after(
                        'div',
                        'a'
                    );
                    const element2 = document.querySelector('#parent2 ~ .test1');
                    return element1.isSameNode(element2);
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        document.getElementById('parent1'),
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
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        document.body.children,
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        document.querySelectorAll('div'),
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
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

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        'div',
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
                '</div>' +
                '<a href="#" class="test1">Test</a>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        'div',
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

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        'div',
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

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.after(
                        'div',
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

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    div.appendChild(span);
                    fragment.appendChild(div);
                    dom.after(
                        'div',
                        fragment
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

        it('works with HTML other nodes', async function() {
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
                    const element1 = document.querySelector('#parent1 > .test1');
                    dom.append(
                        'div',
                        'a'
                    );
                    const element2 = document.querySelector('#parent2 > .test1');
                    return element1.isSameNode(element2);
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        document.getElementById('parent1'),
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
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        document.body.children,
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        document.querySelectorAll('div'),
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
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

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const span = document.createElement('span');
                    fragment.appendChild(span);
                    dom.append(
                        fragment,
                        'a'
                    );
                    document.body.appendChild(fragment);
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const span = document.createElement('span');
                    shadow.appendChild(span);
                    dom.append(
                        shadow,
                        'a'
                    );
                    return shadow.innerHTML;
                }),
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const myDoc = new Document();
                    dom.append(
                        myDoc,
                        myDoc.createElement('html')
                    );
                    return myDoc.childNodes.length;
                }),
                1
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        'div',
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
                '<a href="#" class="test1">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        'div',
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

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        'div',
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

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.append(
                        'div',
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

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    div.appendChild(span);
                    fragment.appendChild(div);
                    dom.append(
                        'div',
                        fragment
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

        it('works with HTML other nodes', async function() {
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
                    const element1 = document.querySelector('#parent1 > .test1');
                    dom.appendTo(
                        'a',
                        'div'
                    );
                    const element2 = document.querySelector('#parent2 > .test1');
                    return element1.isSameNode(element2);
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        document.querySelector('.test1'),
                        'div'
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
                '<a href="#" class="test1">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        document.getElementById('parent1').children,
                        'div'
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        document.querySelectorAll('a'),
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ],
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

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const span = document.createElement('span');
                    fragment.appendChild(span);
                    dom.appendTo(
                        'a',
                        fragment
                    );
                    document.body.appendChild(fragment);
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const span = document.createElement('span');
                    shadow.appendChild(span);
                    dom.appendTo(
                        'a',
                        shadow
                    );
                    return shadow.innerHTML;
                }),
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>'
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const myDoc = new Document();
                    dom.appendTo(
                        myDoc.createElement('html'),
                        myDoc
                    );
                    return myDoc.childNodes.length;
                }),
                1
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        'a',
                        document.getElementById('parent1')
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
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        'a',
                        document.body.children
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

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        'a',
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

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.appendTo(
                        'a',
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

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    div.appendChild(span);
                    fragment.appendChild(div);
                    dom.appendTo(
                        fragment,
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

        it('works with HTML other nodes', async function() {
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
                    const element1 = document.querySelector('#parent1 > .test1');
                    dom.before(
                        'div',
                        'a'
                    );
                    const element2 = document.querySelector('#parent1 ~ .test1');
                    return element1.isSameNode(element2);
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        document.getElementById('parent1'),
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
                '<div id="parent2">' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        document.body.children,
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        document.querySelectorAll('div'),
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
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

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        'div',
                        document.querySelector('.test1')
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
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

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        'div',
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

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        'div',
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

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.before(
                        'div',
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

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    div.appendChild(span);
                    fragment.appendChild(div);
                    dom.before(
                        'div',
                        fragment
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

        it('works with HTML other nodes', async function() {
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
                    const element1 = document.querySelector('#parent1 > .test1');
                    dom.insertAfter(
                        'a',
                        'div'
                    );
                    const element2 = document.querySelector('#parent2 ~ .test1');
                    return element1.isSameNode(element2);
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        document.querySelector('.test1'),
                        'div'
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
                '</div>' +
                '<a href="#" class="test1">Test</a>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        document.getElementById('parent1').children,
                        'div'
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        document.querySelectorAll('a'),
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ],
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

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    div.appendChild(span);
                    fragment.appendChild(div);
                    dom.insertAfter(
                        fragment,
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

        it('works with HTML nodes', async function() {
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

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        'a',
                        document.getElementById('parent1')
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
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        'a',
                        document.body.children
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

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        'a',
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

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertAfter(
                        'a',
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
                    const element1 = document.querySelector('#parent1 > .test1');
                    dom.insertBefore(
                        'a',
                        'div'
                    );
                    const element2 = document.querySelector('#parent1 ~ .test1');
                    return element1.isSameNode(element2);
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        document.querySelector('.test1'),
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
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

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        document.getElementById('parent1').children,
                        'div'
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        document.querySelectorAll('a'),
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ],
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

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    div.appendChild(span);
                    fragment.appendChild(div);
                    dom.insertBefore(
                        fragment,
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

        it('works with HTML nodes', async function() {
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

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        'a',
                        document.getElementById('parent1')
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
                '<div id="parent2">' +
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        'a',
                        document.body.children
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

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        'a',
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

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.insertBefore(
                        'a',
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
                    const element1 = document.querySelector('#parent1 > .test1');
                    dom.prepend(
                        'div',
                        'a'
                    );
                    const element2 = document.querySelector('#parent2 > .test1');
                    return element1.isSameNode(element2);
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        document.getElementById('parent1'),
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
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        document.body.children,
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        document.querySelectorAll('div'),
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
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

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const span = document.createElement('span');
                    fragment.appendChild(span);
                    dom.prepend(
                        fragment,
                        'a'
                    );
                    document.body.appendChild(fragment);
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>'
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const span = document.createElement('span');
                    shadow.appendChild(span);
                    dom.prepend(
                        shadow,
                        'a'
                    );
                    return shadow.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>'
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const myDoc = new Document();
                    dom.prepend(
                        myDoc,
                        myDoc.createElement('html')
                    );
                    return myDoc.childNodes.length;
                }),
                1
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        'div',
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
                '<a href="#" class="test1">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        'div',
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

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        'div',
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

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prepend(
                        'div',
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

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    div.appendChild(span);
                    fragment.appendChild(div);
                    dom.prepend(
                        'div',
                        fragment
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

        it('works with HTML other nodes', async function() {
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
                    const element1 = document.querySelector('#parent1 > .test1');
                    dom.prependTo(
                        'a',
                        'div'
                    );
                    const element2 = document.querySelector('#parent2 > .test1');
                    return element1.isSameNode(element2);
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        document.querySelector('.test1'),
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test1">Test</a>' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        document.getElementById('parent1').children,
                        'div'
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        document.querySelectorAll('a'),
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        [
                            document.querySelector('.test1'),
                            document.querySelector('.test2'),
                            document.querySelector('.test3'),
                            document.querySelector('.test4')
                        ],
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

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    div.appendChild(span);
                    fragment.appendChild(div);
                    dom.prependTo(
                        fragment,
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

        it('works with HTML nodes', async function() {
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

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        'a',
                        document.getElementById('parent1')
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
                '<span></span>' +
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        'a',
                        document.body.children
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

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        'a',
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

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.prependTo(
                        'a',
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

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    const span = document.createElement('span');
                    fragment.appendChild(span);
                    dom.prependTo(
                        'a',
                        fragment
                    );
                    document.body.appendChild(fragment);
                    return document.body.innerHTML;
                }),
                '<div id="parent1">' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '</div>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>'
            );
        });

        it('works with ShadowRoot other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const span = document.createElement('span');
                    shadow.appendChild(span);
                    dom.prependTo(
                        'a',
                        shadow
                    );
                    return shadow.innerHTML;
                }),
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>'
            );
        });

        it('works with Document other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const myDoc = new Document();
                    dom.prependTo(
                        myDoc.createElement('html'),
                        myDoc
                    );
                    return myDoc.childNodes.length;
                }),
                1
            );
        });

    });

});