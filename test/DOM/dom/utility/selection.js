const assert = require('assert').strict;
const exec = require('../../../setup');

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
                '<a href="#" id="a2">Test</a>' +
                '<a href="#" id="a1">Test</a>' +
                't 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
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
                '<a href="#" id="a2">Test</a>' +
                '<a href="#" id="a1">Test</a>' +
                't 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent"></div>'
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

    });

    describe('#selectAll', function() {

    });

    describe('#wrapSelection', function() {

    });

});