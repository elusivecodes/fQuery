const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Wrap', function() {

    describe('#unwrap', function() {

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

        it('unwraps each node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>'
            );
        });

        it('unwraps each node with filter', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        'a',
                        '#parent1'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        document.getElementById('test1'),
                        '#parent1'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        document.getElementById('parent1').children,
                        '#parent1'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        document.querySelectorAll('a'),
                        '#parent1'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2'),
                            document.getElementById('test3'),
                            document.getElementById('test4')
                        ],
                        '#parent1'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with function filter', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        'a',
                        node => node.id === 'parent1'
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLElement filter', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        'a',
                        document.getElementById('parent1')
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection filter', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        'a',
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>'
            );
        });

        it('works with NodeList filter', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        'a',
                        document.querySelectorAll('#parent1')
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

        it('works with array filter', async function() {
            assert.equal(
                await exec(_ => {
                    dom.unwrap(
                        'a',
                        [
                            document.getElementById('parent1')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>'
            );
        });

    });

    describe('#wrap', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="wrap">' +
                    '<div id="parent1">' +
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<a href="#" id="test3">Test</a>' +
                    '<a href="#" id="test4">Test</a>' +
                    '</div>' +
                    '</div>' +
                    '<div id="wrapper">' +
                    '<div class="outer">' +
                    '<div class="inner"></div>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('wraps each node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        'a',
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        document.getElementById('test1'),
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        document.getElementById('parent1').children,
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        document.querySelectorAll('a'),
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2'),
                            document.getElementById('test3'),
                            document.getElementById('test4')
                        ],
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        'a',
                        document.querySelector('.outer')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        'a',
                        document.getElementById('wrapper').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        'a',
                        document.querySelectorAll('.outer')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        'a',
                        [
                            document.querySelector('.outer')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const range = document.createRange();
                    const fragment = range.createContextualFragment(
                        '<div><span></span></div>'
                    );
                    dom.wrap(
                        'a',
                        fragment
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div>' +
                '<span>' +
                '<a href="#" id="test1">Test</a>' +
                '</span>' +
                '</div>' +
                '<div>' +
                '<span>' +
                '<a href="#" id="test2">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div>' +
                '<span>' +
                '<a href="#" id="test3">Test</a>' +
                '</span>' +
                '</div>' +
                '<div>' +
                '<span>' +
                '<a href="#" id="test4">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTML other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrap(
                        'a',
                        '<div class="div-outer"><span class="span-inner"></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="div-outer">' +
                '<span class="span-inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</span>' +
                '</div>' +
                '<div class="div-outer">' +
                '<span class="span-inner">' +
                '<a href="#" id="test2">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="div-outer">' +
                '<span class="span-inner">' +
                '<a href="#" id="test3">Test</a>' +
                '</span>' +
                '</div>' +
                '<div class="div-outer">' +
                '<span class="span-inner">' +
                '<a href="#" id="test4">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

    });

    describe('#wrapAll', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="wrap">' +
                    '<div id="parent1">' +
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<a href="#" id="test3">Test</a>' +
                    '<a href="#" id="test4">Test</a>' +
                    '</div>' +
                    '</div>' +
                    '<div id="wrapper">' +
                    '<div class="outer">' +
                    '<div class="inner"></div>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('wraps all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        'a',
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        document.getElementById('test1'),
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '</div>' +
                '</div>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        document.getElementById('parent1').children,
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        document.querySelectorAll('a'),
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2'),
                            document.getElementById('test3'),
                            document.getElementById('test4')
                        ],
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        'a',
                        document.querySelector('.outer')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        'a',
                        document.getElementById('wrapper').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        'a',
                        document.querySelectorAll('.outer')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        'a',
                        [
                            document.querySelector('.outer')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const range = document.createRange();
                    const fragment = range.createContextualFragment(
                        '<div><span></span></div>'
                    );
                    dom.wrapAll(
                        'a',
                        fragment
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div>' +
                '<span>' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTML other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapAll(
                        'a',
                        '<div class="div-outer"><span class="span-inner"></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="div-outer">' +
                '<span class="span-inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>'
            );
        });

    });

    describe('#wrapInner', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="wrap">' +
                    '<div id="parent1">' +
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<a href="#" id="test3">Test</a>' +
                    '<a href="#" id="test4">Test</a>' +
                    '</div>' +
                    '</div>' +
                    '<div id="wrapper">' +
                    '<div class="outer">' +
                    '<div class="inner"></div>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('wraps contents of each node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        '#wrap > div',
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        document.getElementById('parent1'),
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        document.getElementById('wrap').children,
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        document.querySelectorAll('#wrap > div'),
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const range = document.createRange();
                    const fragment = range.createContextualFragment(
                        '<div><span></span></div>' +
                        '<div><span></span></div>'
                    );
                    dom.wrapInner(
                        fragment,
                        '.outer'
                    );
                    document.body.appendChild(fragment);
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<div><span></span></div>' +
                '<div><span></span></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const range = document.createRange();
                    const fragment = range.createContextualFragment(
                        '<div><span></span></div>' +
                        '<div><span></span></div>'
                    );
                    shadow.appendChild(fragment);
                    dom.wrapInner(
                        shadow,
                        '.outer'
                    );
                    return shadow.innerHTML;
                }),
                '<div class="outer">' +
                '<div class="inner">' +
                '<div><span></span></div>' +
                '<div><span></span></div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        '#wrap > div',
                        document.querySelector('.outer')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        '#wrap > div',
                        document.getElementById('wrapper').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        '#wrap > div',
                        document.querySelectorAll('.outer')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        '#wrap > div',
                        [
                            document.querySelector('.outer')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with DocumentFragment other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const range = document.createRange();
                    const fragment = range.createContextualFragment(
                        '<div><span></span></div>'
                    );
                    dom.wrapInner(
                        '#wrap > div',
                        fragment
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div>' +
                '<span>' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div>' +
                '<span>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTML other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapInner(
                        '#wrap > div',
                        '<div class="div-outer"><span class="span-inner"></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<div class="div-outer">' +
                '<span class="span-inner">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div class="div-outer">' +
                '<span class="span-inner">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

    });

});