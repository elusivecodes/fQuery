const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('DOM Selection', function() {

    describe('#afterSelection', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="select">' +
                    '<div id="div1">' +
                    '<span id="span1">Test 1</span>' +
                    '</div>' +
                    '<div id="div2">' +
                    '<span id="span2">Test 2</span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent">' +
                    '<a href="#" id="a1">Test</a>' +
                    '<a href="#" id="a2">Test</a>' +
                    '</div>';

                const range = document.createRange();
                const span1 = document.getElementById('span1');
                const span2 = document.getElementById('span2');
                range.setStartBefore(span1);
                range.setEnd(span2.firstChild, 3);

                const selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });
        });

        it('inserts each node after the selected nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.afterSelection(
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                't 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.afterSelection(
                        document.getElementById('a1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes' +
                '<a href="#" id="a1">Test</a>' +
                't 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent">' +
                '<a href="#" id="a2">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.afterSelection(
                        document.getElementById('parent').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                't 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.afterSelection(
                        document.querySelectorAll('a')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                't 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
            );
        });

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const range = document.createRange();
                    const fragment = range.createContextualFragment(
                        '<div><span></span></div>'
                    );
                    dom.afterSelection(
                        fragment
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes' +
                '<div><span></span></div>' +
                't 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent">' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                '</div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.afterSelection(
                        [
                            document.getElementById('a1'),
                            document.getElementById('a2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                't 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
            );
        });

        it('works with HTML nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.afterSelection(
                        '<div><span></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes' +
                '<div><span></span></div>' +
                't 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent">' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                '</div>'
            );
        });

    });

    describe('#beforeSelection', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="select">' +
                    '<div id="div1">' +
                    '<span id="span1">Test 1</span>' +
                    '</div>' +
                    '<div id="div2">' +
                    '<span id="span2">Test 2</span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent">' +
                    '<a href="#" id="a1">Test</a>' +
                    '<a href="#" id="a2">Test</a>' +
                    '</div>';

                const range = document.createRange();
                const span1 = document.getElementById('span1');
                const span2 = document.getElementById('span2');
                range.setStart(span1.firstChild, 3);
                range.setEndAfter(span2);

                const selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });
        });

        it('inserts each node before the selected nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.beforeSelection(
                        'a'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                't 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.beforeSelection(
                        document.getElementById('a1')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes' +
                '<a href="#" id="a1">Test</a>' +
                't 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent">' +
                '<a href="#" id="a2">Test</a>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.beforeSelection(
                        document.getElementById('parent').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                't 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.beforeSelection(
                        document.querySelectorAll('a')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                't 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
            );
        });

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const range = document.createRange();
                    const fragment = range.createContextualFragment(
                        '<div><span></span></div>'
                    );
                    dom.beforeSelection(
                        fragment
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes' +
                '<div><span></span></div>' +
                't 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent">' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                '</div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.beforeSelection(
                        [
                            document.getElementById('a1'),
                            document.getElementById('a2')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                't 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
            );
        });

        it('works with HTML nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.beforeSelection(
                        '<div><span></span></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes' +
                '<div><span></span></div>' +
                't 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent">' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                '</div>'
            );
        });

    });

    describe('#extractSelection', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="select">' +
                    '<div id="div1">' +
                    '<span id="span1">Test 1</span>' +
                    '</div>' +
                    '<div id="div2">' +
                    '<span id="span2">Test 2</span>' +
                    '</div>' +
                    '</div>';

                const range = document.createRange();
                const div1 = document.getElementById('div1');
                const span2 = document.getElementById('span2');
                range.setStartBefore(div1);
                range.setEnd(span2.firstChild, 3);

                const selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });
        });

        it('returns the extracted nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const extracted = dom.extractSelection();
                    document.body.innerHTML = '';
                    for (const node of extracted) {
                        document.body.appendChild(node);
                    }
                    return document.body.innerHTML;
                }),
                '<div id="div1"><span id="span1">Test 1</span></div><div id="div2"><span id="span2">Tes</span></div>'
            );
        });

        it('extracts the selected nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.extractSelection();
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div2">' +
                '<span id="span2">t 2</span>' +
                '</div>' +
                '</div>'
            );
        });

    });

    describe('#getSelection', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="select">' +
                    '<div id="div1">' +
                    '<span id="span1">Test 1</span>' +
                    '</div>' +
                    '<div id="div2">' +
                    '<span id="span2">Test 2</span>' +
                    '</div>' +
                    '</div>';

                const range = document.createRange();
                const span2 = document.getElementById('span2');
                range.setStartBefore(span2);
                range.setEnd(span2.firstChild, 3);

                const selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });
        });

        it('returns the selected nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const selected = dom.getSelection();
                    document.body.innerHTML = '';
                    for (const node of selected) {
                        document.body.appendChild(node);
                    }
                    return document.body.innerHTML;
                }),
                '<span id="span2">Test 2</span>'
            );
        });

        it('does not extract the selected nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.getSelection();
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>'
            );
        });

    });

    describe('#select', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="select">' +
                    '<div id="div1" class="select">' +
                    '<span id="span1">Test 1</span>' +
                    '</div>' +
                    '<div id="div2" class="select">' +
                    '<span id="span2">Test 2</span>' +
                    '</div>' +
                    '</div>' +
                    '<input id="input" value="Test 3">' +
                    '<textarea id="textarea">Test 4</textarea>';
            });
        });

        it('creates a selection on the first node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.select(
                        '.select'
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 1'
            );
        });

        it('creates a selection on an input node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.select(
                        '#input'
                    );
                    document.execCommand('cut');
                    return document.getElementById('input').value;
                }),
                ''
            );
        });

        it('creates a selection on a textarea node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.select(
                        '#textarea'
                    );
                    document.execCommand('cut');
                    return document.getElementById('textarea').value;
                }),
                ''
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.select(
                        document.getElementById('div1')
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 1'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.select(
                        document.getElementById('select').children
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 1'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.select(
                        document.querySelectorAll('.select')
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 1'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.select(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2')
                        ]
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 1'
            );
        });

    });

    describe('#selectAll', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="select">' +
                    '<div id="div1">' +
                    '<span id="span1">Test 1</span>' +
                    '</div>' +
                    '<div id="div2" class="select">' +
                    '<span id="span2">Test 2</span>' +
                    '</div>' +
                    '<div id="div3">' +
                    '<span id="span3">Test 3</span>' +
                    '</div>' +
                    '<div id="div4" class="select">' +
                    '<span id="span4">Test 4</span>' +
                    '</div>' +
                    '<div id="div5">' +
                    '<span id="span5">Test 5</span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('creates a selection on all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.selectAll(
                        '.select'
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 2Test 3Test 4'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.selectAll(
                        document.getElementById('div3')
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 3'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.selectAll(
                        document.getElementById('select').children
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 1Test 2Test 3Test 4Test 5'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.selectAll(
                        document.querySelectorAll('.select')
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 2Test 3Test 4'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.selectAll(
                        [
                            document.getElementById('div4'),
                            document.getElementById('div2')
                        ]
                    );
                    const selection = document.getSelection();
                    const range = selection.getRangeAt(0);
                    return range.toString();
                }),
                'Test 2Test 3Test 4'
            );
        });

    });

    describe('#wrapSelection', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="select">' +
                    '<div id="div1">' +
                    '<span id="span1">Test 1</span>' +
                    '</div>' +
                    '<div id="div2">' +
                    '<span id="span2">Test 2</span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="wrapper">' +
                    '<div class="outer">' +
                    '<div class="inner"></div>' +
                    '</div>' +
                    '</div>';

                const range = document.createRange();
                const span1 = document.getElementById('span1');
                const span2 = document.getElementById('span2');
                range.setStart(span1.firstChild, 3);
                range.setEnd(span2.firstChild, 3);

                const selection = document.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });
        });

        it('wraps selected nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapSelection(
                        '.outer'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes</span>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<div id="div1">' +
                '<span id="span1">t 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">t 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '</div>'
            )
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapSelection(
                        document.querySelector('.outer')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes</span>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<div id="div1">' +
                '<span id="span1">t 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">t 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '</div>'
            )
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapSelection(
                        document.getElementById('wrapper').children
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes</span>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<div id="div1">' +
                '<span id="span1">t 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">t 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '</div>'
            )
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapSelection(
                        document.querySelectorAll('.outer')
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes</span>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<div id="div1">' +
                '<span id="span1">t 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">t 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '</div>'
            )
        });

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const range = document.createRange();
                    const fragment = range.createContextualFragment(
                        '<div class="div-outer"><div class="div-inner"></div></div>'
                    );
                    dom.wrapSelection(
                        fragment
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes</span>' +
                '</div>' +
                '<div class="div-outer">' +
                '<div class="div-inner">' +
                '<div id="div1">' +
                '<span id="span1">t 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">t 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            )
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapSelection(
                        [
                            document.querySelector('.outer')
                        ]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes</span>' +
                '</div>' +
                '<div class="outer">' +
                '<div class="inner">' +
                '<div id="div1">' +
                '<span id="span1">t 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">t 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '</div>'
            )
        });

        it('works with HTML nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.wrapSelection(
                        '<div class="div-outer"><div class="div-inner"></div></div>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Tes</span>' +
                '</div>' +
                '<div class="div-outer">' +
                '<div class="div-inner">' +
                '<div id="div1">' +
                '<span id="span1">t 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Tes</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">t 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner">' +
                '</div>' +
                '</div>' +
                '</div>'
            )
        });

    });

});
