const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Styles)', function() {

    describe('#addClass', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('adds a class to all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.addClass(
                        'div',
                        'test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test"></div>' +
                '<div id="test2" class="test"></div>'
            );
        });

        it('parses classes from string', async function() {
            assert.equal(
                await exec(_ => {
                    dom.addClass(
                        'div',
                        'test1 test2'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test1 test2"></div>' +
                '<div id="test2" class="test1 test2"></div>'
            );
        });

        it('parses classes from array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.addClass(
                        'div',
                        [
                            'test1',
                            'test2'
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test1 test2"></div>' +
                '<div id="test2" class="test1 test2"></div>'
            );
        });

        it('parses classes from multiple arguments', async function() {
            assert.equal(
                await exec(_ => {
                    dom.addClass(
                        'div',
                        'test1',
                        ['test2']
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test1 test2"></div>' +
                '<div id="test2" class="test1 test2"></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.addClass(
                        document.getElementById('test1'),
                        'test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.addClass(
                        document.body.children,
                        'test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test"></div>' +
                '<div id="test2" class="test"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.addClass(
                        document.querySelectorAll('div'),
                        'test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test"></div>' +
                '<div id="test2" class="test"></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.addClass(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test"></div>' +
                '<div id="test2" class="test"></div>'
            );
        });

    });

    describe('#css', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { display: block; width: 50vw; }' +
                    '</style>' +
                    '<div id="parent">' +
                    '<div id="test1" class="test"></div>' +
                    '<div id="test2" class="test"></div>' +
                    '</div>';
            });
        });

        it('returns an object with all computed styles for the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const css = dom.css(
                        '.test'
                    );
                    return {
                        display: css.display,
                        width: css.width
                    }
                }),
                {
                    display: 'block',
                    width: '400px'
                }
            );
        });

        it('returns a computed style for the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.css(
                        '.test',
                        'width'
                    );
                }),
                '400px'
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.css(
                        '#invalid',
                        'width'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.css(
                        document.getElementById('test1'),
                        'width'
                    );
                }),
                '400px'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.css(
                        document.getElementById('parent').children,
                        'width'
                    );
                }),
                '400px'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.css(
                        document.querySelectorAll('.test'),
                        'width'
                    );
                }),
                '400px'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.css(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'width'
                    );
                }),
                '400px'
            );
        });

    });

    describe('#getStyle', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" style="display: block; width: 100px; height: 100px;"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('returns an object with all style values for the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.getStyle(
                        'div'
                    );
                }),
                {
                    display: 'block',
                    width: '100px',
                    height: '100px'
                }
            );
        });

        it('returns a style value for the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getStyle(
                        'div',
                        'display'
                    );
                }),
                'block'
            );
        });

        it('returns an empty string for an undefined style', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getStyle(
                        'div',
                        'visibility'
                    );
                }),
                ''
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getStyle(
                        '#invalid',
                        'display'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getStyle(
                        document.getElementById('test1'),
                        'display'
                    );
                }),
                'block'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getStyle(
                        document.body.children,
                        'display'
                    );
                }),
                'block'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getStyle(
                        document.querySelectorAll('div'),
                        'display'
                    );
                }),
                'block'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getStyle(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'display'
                    );
                }),
                'block'
            );
        });

    });

    describe('#hide', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('hides all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.hide(
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style="display: none;"></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.hide(
                        document.getElementById('test1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.hide(
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style="display: none;"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.hide(
                        document.querySelectorAll('div')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style="display: none;"></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.hide(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style="display: none;"></div>'
            );
        });

    });

    describe('#removeClass', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" class="test1 test2"></div>' +
                    '<div id="test2" class="test1 test2"></div>';
            });
        });

        it('removes a class from all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeClass(
                        'div',
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test2"></div>'
            );
        });

        it('parses classes from string', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeClass(
                        'div',
                        'test1 test2'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class=""></div>' +
                '<div id="test2" class=""></div>'
            );
        });

        it('parses classes from array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeClass(
                        'div',
                        [
                            'test1',
                            'test2'
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class=""></div>' +
                '<div id="test2" class=""></div>'
            );
        });

        it('parses classes from multiple arguments', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeClass(
                        'div',
                        'test1',
                        ['test2']
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class=""></div>' +
                '<div id="test2" class=""></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeClass(
                        document.getElementById('test1'),
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test1 test2"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeClass(
                        document.body.children,
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test2"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeClass(
                        document.querySelectorAll('div'),
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test2"></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeClass(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test2"></div>'
            );
        });

    });

    describe('#setStyle', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('sets a styles object for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        'div',
                        {
                            display: 'block',
                            width: '100%',
                            height: '100',
                            opacity: 0.5
                        }
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: block; width: 100%; height: 100px; opacity: 0.5;"></div>' +
                '<div id="test2" style="display: block; width: 100%; height: 100px; opacity: 0.5;"></div>'
            );
        });

        it('sets a style value for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        'div',
                        'display',
                        'block'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: block;"></div>' +
                '<div id="test2" style="display: block;"></div>'
            );
        });

        it('converts numbers to pixels arguments', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        'div',
                        'width',
                        '100'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="width: 100px;"></div>' +
                '<div id="test2" style="width: 100px;"></div>'
            );
        });

        it('does not convert numbers with units to pixels arguments', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        'div',
                        'width',
                        '100%'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="width: 100%;"></div>' +
                '<div id="test2" style="width: 100%;"></div>'
            );
        });

        it('sets a style value for all nodes with important', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        'div',
                        'display',
                        'block',
                        true
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: block !important;"></div>' +
                '<div id="test2" style="display: block !important;"></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        document.getElementById('test1'),
                        'display',
                        'block'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: block;"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        document.body.children,
                        'display',
                        'block'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: block;"></div>' +
                '<div id="test2" style="display: block;"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        document.querySelectorAll('div'),
                        'display',
                        'block'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: block;"></div>' +
                '<div id="test2" style="display: block;"></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setStyle(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'display',
                        'block'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: block;"></div>' +
                '<div id="test2" style="display: block;"></div>'
            );
        });

    });

    describe('#show', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" style="display: none;"></div>' +
                    '<div id="test2" style="display: none;"></div>';
            });
        });

        it('shows all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.show(
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style=""></div>' +
                '<div id="test2" style=""></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.show(
                        document.getElementById('test1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style=""></div>' +
                '<div id="test2" style="display: none;"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.show(
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style=""></div>' +
                '<div id="test2" style=""></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.show(
                        document.querySelectorAll('div')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style=""></div>' +
                '<div id="test2" style=""></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.show(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style=""></div>' +
                '<div id="test2" style=""></div>'
            );
        });

    });

    describe('#toggle', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"></div>' +
                    '<div id="test2" style="display: none;"></div>';
            });
        });

        it('toggles the visibility of all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggle(
                        'div'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style=""></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggle(
                        document.getElementById('test1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style="display: none;"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggle(
                        document.body.children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style=""></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggle(
                        document.querySelectorAll('div')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style=""></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggle(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style=""></div>'
            );
        });

    });

    describe('#toggleClass', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" class="test1 test2"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('toggles a class for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggleClass(
                        'div',
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test1"></div>'
            );
        });

        it('parses classes from string', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggleClass(
                        'div',
                        'test1 test2'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class=""></div>' +
                '<div id="test2" class="test1 test2"></div>'
            );
        });

        it('parses classes from array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggleClass(
                        'div',
                        [
                            'test1',
                            'test2'
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class=""></div>' +
                '<div id="test2" class="test1 test2"></div>'
            );
        });

        it('parses classes from multiple arguments', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggleClass(
                        'div',
                        'test1',
                        ['test2']
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class=""></div>' +
                '<div id="test2" class="test1 test2"></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggleClass(
                        document.getElementById('test1'),
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggleClass(
                        document.body.children,
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test1"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggleClass(
                        document.querySelectorAll('div'),
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test1"></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.toggleClass(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'test1'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" class="test2"></div>' +
                '<div id="test2" class="test1"></div>'
            );
        });

    });

});