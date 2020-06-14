const assert = require('assert').strict;
const { exec } = require('../../../setup');

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