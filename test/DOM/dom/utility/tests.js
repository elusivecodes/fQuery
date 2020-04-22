const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Tests', function() {

    describe('#hasAnimation', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
                dom.fadeIn(
                    '.test'
                );
            });
        });

        it('returns true if any node has an animation', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAnimation(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have an animation', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAnimation(
                        'div:not(.test)'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAnimation(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAnimation(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAnimation(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAnimation(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#hasAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node has a specified attribute', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAttribute(
                        'div',
                        'class'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have a specified attribute', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAttribute(
                        'div:not(.test)',
                        'class'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAttribute(
                        document.getElementById('div1'),
                        'class'
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAttribute(
                        document.body.children,
                        'class'
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAttribute(
                        document.querySelectorAll('div'),
                        'class'
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasAttribute(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        'class'
                    );
                }),
                true
            );
        });

    });

    describe('#hasChildren', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test">' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test">' +
                    '<span></span>' +
                    '</div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node has children', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasChildren(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have children', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasChildren(
                        'div:not(.test)'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasChildren(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasChildren(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasChildren(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasChildren(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#hasClass', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node has a specified class', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasClass(
                        'div',
                        'test'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have a specified class', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasClass(
                        'div:not(.test)',
                        'test'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasClass(
                        document.getElementById('div1'),
                        'test'
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasClass(
                        document.body.children,
                        'test'
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasClass(
                        document.querySelectorAll('div'),
                        'test'
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasClass(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        'test'
                    );
                }),
                true
            );
        });

    });

    describe('#hasCSSAnimation', function() {

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

        it('returns true if any node has a CSS animation', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSAnimation(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have a CSS animation', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSAnimation(
                        'div:not(.test)'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSAnimation(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSAnimation(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSAnimation(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSAnimation(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#hasCSSTransition', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { transition: opacity 1s; }' +
                    '</style>' +
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node has a CSS transition', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSTransition(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have a CSS transition', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSTransition(
                        'div:not(.test)'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSTransition(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSTransition(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSTransition(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasCSSTransition(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#hasData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
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

        it('returns true if any node has data', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasData(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have data', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasData(
                        'div:not(.test)'
                    );
                }),
                false
            );
        });

        it('returns true if any node has data for a key', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasData(
                        '#div1',
                        'test1'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have data for a key', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasData(
                        '#div1',
                        'test2'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasData(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasData(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasData(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasData(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#hasDescendent', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test">' +
                    '<span id="span1">' +
                    '<a id="a1"></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test">' +
                    '<span id="span2">' +
                    '<a id="a2"></a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node has a descendent matching a filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        'div',
                        'a'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have a descendent matching a filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        'div:not(.test)',
                        'a'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        document.getElementById('div1'),
                        'a'
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        document.body.children,
                        'a'
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        document.querySelectorAll('div'),
                        'a'
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        'a'
                    );
                }),
                true
            );
        });

        it('works with function filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        'div',
                        node => node.id === 'a1'
                    );
                }),
                true
            );
        });

        it('works with HTMLElement filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        'div',
                        document.getElementById('a1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        'div',
                        document.getElementById('span1').children
                    );
                }),
                true
            );
        });

        it('works with NodeList filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        'div',
                        document.querySelectorAll('a')
                    );
                }),
                true
            );
        });

        it('works with array filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasDescendent(
                        'div',
                        [
                            document.getElementById('a1'),
                            document.getElementById('a2')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#hasFragment', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<template id="template1">' +
                    'Test 1' +
                    '</template>' +
                    '<template id="template2">' +
                    'Test 2' +
                    '</template>' +
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>';
            });
        });

        it('returns true if any node has a document fragment', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasFragment(
                        'template'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have a document fragment', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasFragment(
                        'div'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasFragment(
                        document.getElementById('template1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasFragment(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasFragment(
                        document.querySelectorAll('template')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasFragment(
                        [
                            document.getElementById('template1'),
                            document.getElementById('template2'),
                            document.getElementById('div1'),
                            document.getElementById('div2')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#hasProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
                document.getElementById('div1').test = 'Test 1';
                document.getElementById('div3').test = 'Test 2';
            });
        });

        it('returns true if any node has a specified property', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasProperty(
                        'div',
                        'test'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have a specified property', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasProperty(
                        'div:not(.test)',
                        'test'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasProperty(
                        document.getElementById('div1'),
                        'test'
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasProperty(
                        document.body.children,
                        'test'
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasProperty(
                        document.querySelectorAll('div'),
                        'test'
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasProperty(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        'test'
                    );
                }),
                true
            );
        });

    });

    describe('#hasShadow', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
                document.getElementById('div1').attachShadow({ mode: 'open' });
                document.getElementById('div3').attachShadow({ mode: 'closed' });
            });
        });

        it('returns true if any node has a shadow root', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasShadow(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes have a shadow root', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasShadow(
                        'div:not(.test)'
                    );
                }),
                false
            );
        });

        it('returns false for closed shadow roots', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasShadow(
                        '#div3'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasShadow(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasShadow(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasShadow(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.hasShadow(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#is', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node matches a filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        'div',
                        '.test'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes match a filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        'div:not(.test)',
                        '.test'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        document.getElementById('div1'),
                        '.test'
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        document.body.children,
                        '.test'
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        document.querySelectorAll('div'),
                        '.test'
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        '.test'
                    );
                }),
                true
            );
        });

        it('works with function filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        'div',
                        node => node.classList.contains('test')
                    );
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        'div',
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        'div',
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        'div',
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.is(
                        'div',
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#isConnected', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node is connected to the DOM', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isConnected(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes are connected to the DOM', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isConnected(
                        document.createElement('div')
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isConnected(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isConnected(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isConnected(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isConnected(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#isEqual', function() {

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
                    '</div>' +
                    '<div id="parent2">' +
                    '<a data-id="a1"></a>' +
                    '<a data-id="a2"></a>' +
                    '<a data-id="a3"></a>' +
                    '</div>';
            });
        });

        it('returns true if any node is equal to any other node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        '#parent1 span',
                        '#parent2 span'
                    );
                }),
                true
            );
        });

        it('returns true if no nodes are equal to any other node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        '#parent1 span',
                        '#parent3 a'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        document.querySelector('#parent1 [data-id="span2"]'),
                        '#parent2 span'
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        document.getElementById('parent1').children,
                        '#parent2 span'
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        document.querySelectorAll('#parent1 span'),
                        '#parent2 span'
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        [
                            document.querySelector('#parent1 > [data-id="span1"]'),
                            document.querySelector('#parent1 > [data-id="span2"]'),
                            document.querySelector('#parent1 > [data-id="span3"]')
                        ],
                        '#parent2 span'
                    );
                }),
                true
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        '#parent1 span',
                        document.querySelector('#parent2 > [data-id="span2"]')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        '#parent1 span',
                        document.getElementById('parent2').children
                    );
                }),
                true
            );
        });

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        '#parent1 span',
                        document.querySelectorAll('#parent2 > span')
                    );
                }),
                true
            );
        });

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isEqual(
                        '#parent1 span',
                        [
                            document.querySelector('#parent2 > [data-id="span2"]'),
                            document.querySelector('#parent2 > [data-id="span3"]')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#isFixed', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { position: fixed; }' +
                    '</style>' +
                    '<div id="div1">' +
                    '<span id="span1"></span>' +
                    '</div>' +
                    '<div id="div2" class="test">' +
                    '<span id="span2"></span>' +
                    '</div>' +
                    '<div id="div3">' +
                    '<span id="span3"></span>' +
                    '</div>' +
                    '<div id="div4" class="test">' +
                    '<span id="span4"></span>' +
                    '</div>';
            });
        });

        it('returns true if any node is fixed', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isFixed(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes are fixed', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isFixed(
                        'div:not(.test)'
                    );
                }),
                false
            );
        });

        it('returns true if any node is a descdent of a fixed node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isFixed(
                        'span'
                    );
                }),
                true
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isFixed(
                        document.getElementById('div2')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isFixed(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isFixed(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isFixed(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#isHidden', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { display: none; }' +
                    '</style>' +
                    '<div id="div1" class="test"></div>' +
                    '<div id="div1"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node is hidden', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isHidden(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes are hidden', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isHidden(
                        'div:not(.test)'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isHidden(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isHidden(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isHidden(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isHidden(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#isSame', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns true if any node is identical to any other node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        'div',
                        '#div2, #div4'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes are identical to any other node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        'div',
                        'span'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        document.getElementById('div2'),
                        '#div2, #div4'
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        document.body.children,
                        '#div2, #div4'
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        document.querySelectorAll('div'),
                        '#div2, #div4'
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        '#div2, #div4'
                    );
                }),
                true
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        'div',
                        document.getElementById('div2')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        'div',
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        'div',
                        document.querySelectorAll('#div2, #div4')
                    );
                }),
                true
            );
        });

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isSame(
                        'div',
                        [
                            document.querySelector('#div2'),
                            document.querySelector('#div4')
                        ]
                    );
                }),
                true
            );
        });

    });

    describe('#isVisible', function() {

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

        it('returns true if any node is visible', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isVisible(
                        'div'
                    );
                }),
                true
            );
        });

        it('returns false if no nodes are visible', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isVisible(
                        '.test'
                    );
                }),
                false
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isVisible(
                        document.getElementById('div1')
                    );
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isVisible(
                        document.body.children
                    );
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isVisible(
                        document.querySelectorAll('div')
                    );
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.isVisible(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                true
            );
        });

    });

});